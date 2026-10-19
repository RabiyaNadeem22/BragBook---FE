import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Lightbulb, Pencil, Plus, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { Alert } from '../components/ui/Alert';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { skillsApi } from '../api/skills';
import { applyApiFieldErrors } from '../utils/authValidation';
import { formatYears, titleCaseEnum } from '../utils/formatters';

const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
const CATEGORY_SUGGESTIONS = [
  'Backend',
  'Frontend',
  'Database',
  'DevOps',
  'Architecture',
  'Leadership',
  'Soft Skills',
  'Other',
];

const levelBadge = {
  BEGINNER: 'secondary',
  INTERMEDIATE: 'outline',
  ADVANCED: 'default',
  EXPERT: 'success',
};

const skillSchema = z.object({
  name: z.string().trim().min(1, 'Skill name is required').max(100),
  category: z.string().trim().min(1, 'Category is required').max(50),
  level: z.enum(LEVELS),
  yearsOfExperience: z.string().optional(),
});

function toPayload(values) {
  const years = values.yearsOfExperience?.trim();
  return {
    name: values.name.trim(),
    category: values.category.trim(),
    level: values.level,
    yearsOfExperience: years === '' ? null : Number(years),
  };
}

export function SkillsPage() {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [formError, setFormError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['skills'],
    queryFn: () => skillsApi.list(),
  });

  const skills = data?.data?.skills || [];
  const categories = useMemo(
    () => [...new Set(skills.map((s) => s.category).filter(Boolean))].sort(),
    [skills]
  );

  const grouped = useMemo(() => {
    const visible = categoryFilter ? skills.filter((s) => s.category === categoryFilter) : skills;
    return visible.reduce((acc, skill) => {
      const key = skill.category || 'Other';
      if (!acc[key]) acc[key] = [];
      acc[key].push(skill);
      return acc;
    }, {});
  }, [skills, categoryFilter]);

  const form = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      category: '',
      level: 'INTERMEDIATE',
      yearsOfExperience: '',
    },
  });

  const openCreate = () => {
    setEditing(null);
    setFormError('');
    form.reset({ name: '', category: '', level: 'INTERMEDIATE', yearsOfExperience: '' });
    setFormOpen(true);
  };

  const openEdit = (skill) => {
    setEditing(skill);
    setFormError('');
    form.reset({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      yearsOfExperience: skill.yearsOfExperience ?? '',
    });
    setFormOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (values) =>
      editing ? skillsApi.update(editing.id, toPayload(values)) : skillsApi.create(toPayload(values)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      setFormOpen(false);
      setEditing(null);
    },
    onError: (err) => {
      applyApiFieldErrors(err, form.setError);
      setFormError(err.message || 'Could not save skill.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => skillsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      setDeleting(null);
      setDeleteError('');
    },
    onError: (err) => {
      setDeleteError(err.message || 'Could not delete skill.');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" /> Skills & Competencies
          </h1>
          <p className="text-sm text-muted-foreground">
            Track technical proficiencies, soft skills, and mastery over time.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-1.5" /> Add Skill
        </Button>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant={categoryFilter === '' ? 'primary' : 'outline'} onClick={() => setCategoryFilter('')}>
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={categoryFilter === category ? 'primary' : 'outline'}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">{skills.length} skills</span>
        </div>
      )}

      {isError && <Alert>{error.message || 'Failed to load skills.'}</Alert>}
      {deleteError && <Alert>{deleteError}</Alert>}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : skills.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="No skills yet"
          description="Add the technologies and competencies you want to showcase in reviews and interviews."
          actionLabel="Add Skill"
          onAction={openCreate}
        />
      ) : Object.keys(grouped).length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="No skills in this category"
          description="Try another filter or add a skill to this category."
          actionLabel="Add Skill"
          onAction={openCreate}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(grouped).map(([category, items]) => (
            <Card key={category} className="p-5">
              <h3 className="font-semibold text-base text-foreground mb-4 flex items-center justify-between">
                <span>{category}</span>
                <span className="text-xs text-muted-foreground">{items.length} skills</span>
              </h3>
              <div className="space-y-3">
                {items.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border/80 bg-muted/20 hover:bg-muted/50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{formatYears(s.yearsOfExperience)}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Badge variant={levelBadge[s.level] || 'secondary'}>{titleCaseEnum(s.level)}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s)} title="Edit">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleting(s)}
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Edit skill' : 'Add skill'}
        description="Record the skill, category, level, and years of experience."
      >
        <form onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))} className="space-y-4" noValidate>
          {formError && <Alert>{formError}</Alert>}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Skill name</label>
            <Input placeholder="e.g. PostgreSQL" error={form.formState.errors.name?.message} {...form.register('name')} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Category</label>
            <Input
              list="skill-categories"
              placeholder="e.g. Backend"
              error={form.formState.errors.category?.message}
              {...form.register('category')}
            />
            <datalist id="skill-categories">
              {[...new Set([...CATEGORY_SUGGESTIONS, ...categories])].map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Level</label>
              <Select error={form.formState.errors.level?.message} {...form.register('level')}>
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {titleCaseEnum(level)}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Years of experience</label>
              <Input
                type="number"
                min="0"
                max="50"
                step="0.5"
                placeholder="e.g. 4"
                error={form.formState.errors.yearsOfExperience?.message}
                {...form.register('yearsOfExperience')}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={saveMutation.isPending}>
              {editing ? 'Save changes' : 'Add skill'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting.id)}
        title="Delete skill?"
        description={deleting ? `“${deleting.name}” will be removed from your profile.` : ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
