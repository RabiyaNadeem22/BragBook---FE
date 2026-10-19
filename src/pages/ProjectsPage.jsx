import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Calendar, FolderGit2, Pencil, Plus, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { Alert } from '../components/ui/Alert';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { projectsApi } from '../api/projects';
import { applyApiFieldErrors } from '../utils/authValidation';
import { formatProjectTimeline, titleCaseEnum, toDateInputValue } from '../utils/formatters';

const STATUSES = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'];

const statusBadge = {
  PLANNED: 'secondary',
  IN_PROGRESS: 'default',
  COMPLETED: 'success',
  ARCHIVED: 'outline',
};

const projectSchema = z
  .object({
    name: z.string().trim().min(1, 'Project name is required').max(200),
    role: z.string().optional(),
    description: z.string().optional(),
    technologies: z.string().optional(),
    status: z.enum(STATUSES),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return data.endDate >= data.startDate;
    },
    { message: 'End date cannot be before start date', path: ['endDate'] }
  );

function toPayload(values) {
  return {
    name: values.name.trim(),
    role: values.role?.trim() || null,
    description: values.description?.trim() || null,
    technologies: values.technologies || '',
    status: values.status,
    startDate: values.startDate || null,
    endDate: values.endDate || null,
  };
}

export function ProjectsPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [formError, setFormError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['projects', statusFilter],
    queryFn: () => projectsApi.list(statusFilter ? { status: statusFilter } : undefined),
  });

  const projects = data?.data?.projects || [];

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      role: '',
      description: '',
      technologies: '',
      status: 'IN_PROGRESS',
      startDate: '',
      endDate: '',
    },
  });

  const openCreate = () => {
    setEditing(null);
    setFormError('');
    form.reset({
      name: '',
      role: '',
      description: '',
      technologies: '',
      status: 'IN_PROGRESS',
      startDate: '',
      endDate: '',
    });
    setFormOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setFormError('');
    form.reset({
      name: project.name,
      role: project.role || '',
      description: project.description || '',
      technologies: (project.technologies || []).join(', '),
      status: project.status,
      startDate: toDateInputValue(project.startDate),
      endDate: toDateInputValue(project.endDate),
    });
    setFormOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (values) =>
      editing ? projectsApi.update(editing.id, toPayload(values)) : projectsApi.create(toPayload(values)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setFormOpen(false);
      setEditing(null);
    },
    onError: (err) => {
      applyApiFieldErrors(err, form.setError);
      setFormError(err.message || 'Could not save project.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => projectsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setDeleting(null);
      setDeleteError('');
    },
    onError: (err) => {
      setDeleteError(err.message || 'Could not delete project.');
    },
  });

  const counts = useMemo(() => {
    const list = projects;
    return {
      total: list.length,
      active: list.filter((p) => p.status === 'IN_PROGRESS').length,
    };
  }, [projects]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-primary" /> Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            Group your achievements and impact by initiatives and projects.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-1.5" /> Add Project
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={statusFilter === '' ? 'primary' : 'outline'} onClick={() => setStatusFilter('')}>
          All
        </Button>
        {STATUSES.map((status) => (
          <Button
            key={status}
            size="sm"
            variant={statusFilter === status ? 'primary' : 'outline'}
            onClick={() => setStatusFilter(status)}
          >
            {titleCaseEnum(status)}
          </Button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          {counts.total} projects · {counts.active} in progress
        </span>
      </div>

      {isError && <Alert>{error.message || 'Failed to load projects.'}</Alert>}
      {deleteError && <Alert>{deleteError}</Alert>}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title={statusFilter ? 'No projects in this status' : 'No projects yet'}
          description="Add a project to group related achievements, technologies, and impact."
          actionLabel="Add Project"
          onAction={openCreate}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.id} className="flex flex-col justify-between p-5 hover:border-primary/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={statusBadge[p.status] || 'secondary'}>{titleCaseEnum(p.status)}</Badge>
                  <span className="text-xs text-muted-foreground">{p._count?.achievements || 0} wins</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground">{p.name}</h3>
                  {p.role && <p className="text-xs font-medium text-primary mt-0.5">{p.role}</p>}
                </div>
                {p.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{p.description}</p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border/60 space-y-3">
                {p.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.map((tech) => (
                      <span key={tech} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formatProjectTimeline(p.startDate, p.endDate, p.status)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)} title="Edit">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleting(p)}
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Edit project' : 'Add project'}
        description="Capture the initiative, your role, stack, and timeline."
        maxWidth="max-w-xl"
      >
        <form onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))} className="space-y-4" noValidate>
          {formError && <Alert>{formError}</Alert>}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Name</label>
            <Input error={form.formState.errors.name?.message} {...form.register('name')} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Your role</label>
              <Input error={form.formState.errors.role?.message} {...form.register('role')} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Status</label>
              <Select error={form.formState.errors.status?.message} {...form.register('status')}>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {titleCaseEnum(status)}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Description</label>
            <Textarea rows={3} error={form.formState.errors.description?.message} {...form.register('description')} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Technologies</label>
            <Input
              placeholder="Node.js, PostgreSQL, React"
              error={form.formState.errors.technologies?.message}
              {...form.register('technologies')}
            />
            <p className="mt-1 text-[11px] text-muted-foreground">Separate technologies with commas.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Start date</label>
              <Input type="date" error={form.formState.errors.startDate?.message} {...form.register('startDate')} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">End date</label>
              <Input type="date" error={form.formState.errors.endDate?.message} {...form.register('endDate')} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={saveMutation.isPending}>
              {editing ? 'Save changes' : 'Create project'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting.id)}
        title="Delete project?"
        description={
          deleting
            ? `“${deleting.name}” will be removed. Linked achievements will stay, but they will no longer be tied to this project.`
            : ''
        }
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
