import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, ArrowRight, Lock, Mail, User, Briefcase, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Alert } from '../components/ui/Alert';
import { useAuth } from '../context/AuthContext';
import { registerSchema, applyApiFieldErrors } from '../utils/authValidation';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      jobTitle: '',
      company: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values) => {
    setFormError('');
    try {
      await registerUser({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        jobTitle: values.jobTitle?.trim() || null,
        company: values.company?.trim() || null,
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      applyApiFieldErrors(error, setError);
      setFormError(error.message || 'Unable to create your account. Please try again.');
    }
  };

  return (
    <Card className="w-full shadow-lg border-border/80">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
          <Sparkles className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold">Create your BragBook</CardTitle>
        <CardDescription>
          Start tracking your accomplishments, impact, and career trajectory
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-3.5">
          {formError && <Alert>{formError}</Alert>}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> Full Name
            </label>
            <Input
              type="text"
              autoComplete="name"
              placeholder="e.g. Alex Rivera"
              error={errors.name?.message}
              {...register('name')}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email Address
            </label>
            <Input
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" /> Job Title
              </label>
              <Input
                type="text"
                autoComplete="organization-title"
                placeholder="e.g. Senior Engineer"
                error={errors.jobTitle?.message}
                {...register('jobTitle')}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" /> Company
              </label>
              <Input
                type="text"
                autoComplete="organization"
                placeholder="e.g. Acme Inc."
                error={errors.company?.message}
                {...register('company')}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Password
            </label>
            <PasswordInput
              autoComplete="new-password"
              placeholder="At least 8 characters"
              error={errors.password?.message}
              {...register('password')}
            />
            <p className="text-[11px] text-muted-foreground">Use 8+ characters with at least one letter and one number.</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Confirm Password
            </label>
            <PasswordInput
              autoComplete="new-password"
              placeholder="Repeat your password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Create Account <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
