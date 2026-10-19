import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Settings, User, Database, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Alert } from '../components/ui/Alert';
import { useAuth } from '../context/AuthContext';
import {
  updateProfileSchema,
  changePasswordSchema,
  applyApiFieldErrors,
} from '../utils/authValidation';

export function SettingsPage() {
  const { user, updateProfile, changePassword } = useAuth();
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  const profileForm = useForm({
    resolver: zodResolver(updateProfileSchema),
    values: {
      name: user?.name || '',
      jobTitle: user?.jobTitle || '',
      company: user?.company || '',
      bio: user?.bio || '',
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSaveProfile = async (values) => {
    setProfileMessage({ type: '', text: '' });
    try {
      await updateProfile({
        name: values.name.trim(),
        jobTitle: values.jobTitle?.trim() || null,
        company: values.company?.trim() || null,
        bio: values.bio?.trim() || null,
      });
      setProfileMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (error) {
      applyApiFieldErrors(error, profileForm.setError);
      setProfileMessage({ type: 'error', text: error.message || 'Could not update profile.' });
    }
  };

  const onChangePassword = async (values) => {
    setPasswordMessage({ type: '', text: '' });
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      passwordForm.reset();
      setPasswordMessage({ type: 'success', text: 'Password updated successfully.' });
    } catch (error) {
      applyApiFieldErrors(error, passwordForm.setError);
      setPasswordMessage({ type: 'error', text: error.message || 'Could not update password.' });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" /> Settings & Preferences
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account profile, password, and export options.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> Profile Information
            </CardTitle>
            <CardDescription>Update your personal and career bio</CardDescription>
          </CardHeader>
          <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="space-y-4" noValidate>
            {profileMessage.text && (
              <Alert variant={profileMessage.type === 'success' ? 'success' : 'error'}>
                {profileMessage.text}
              </Alert>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Full Name</label>
                <Input error={profileForm.formState.errors.name?.message} {...profileForm.register('name')} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Email Address</label>
                <Input value={user?.email || ''} disabled />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Job Title</label>
                <Input error={profileForm.formState.errors.jobTitle?.message} {...profileForm.register('jobTitle')} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Company</label>
                <Input error={profileForm.formState.errors.company?.message} {...profileForm.register('company')} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Bio</label>
              <Textarea
                rows={3}
                placeholder="A short professional summary"
                error={profileForm.formState.errors.bio?.message}
                {...profileForm.register('bio')}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm" isLoading={profileForm.formState.isSubmitting}>
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Password
            </CardTitle>
            <CardDescription>Change the password used to sign in to your account</CardDescription>
          </CardHeader>
          <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4 max-w-md" noValidate>
            {passwordMessage.text && (
              <Alert variant={passwordMessage.type === 'success' ? 'success' : 'error'}>
                {passwordMessage.text}
              </Alert>
            )}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Current password</label>
              <PasswordInput
                autoComplete="current-password"
                error={passwordForm.formState.errors.currentPassword?.message}
                {...passwordForm.register('currentPassword')}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">New password</label>
              <PasswordInput
                autoComplete="new-password"
                error={passwordForm.formState.errors.newPassword?.message}
                {...passwordForm.register('newPassword')}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Confirm new password</label>
              <PasswordInput
                autoComplete="new-password"
                error={passwordForm.formState.errors.confirmPassword?.message}
                {...passwordForm.register('confirmPassword')}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm" isLoading={passwordForm.formState.isSubmitting}>
                Update Password
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" /> Data & Export
            </CardTitle>
            <CardDescription>Export your brag document data for performance reviews or resumes</CardDescription>
          </CardHeader>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" disabled title="Coming in a later phase">
              Export as Markdown (.md)
            </Button>
            <Button variant="outline" size="sm" disabled title="Coming in a later phase">
              Export as JSON
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
