/**
 * Composants et utilities pour gérer les erreurs Directus
 */

'use client';

import React from 'react';

interface DirectusErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

interface DirectusErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary pour les composants Directus
 */
export class DirectusErrorBoundary extends React.Component<
  DirectusErrorBoundaryProps,
  DirectusErrorBoundaryState
> {
  constructor(props: DirectusErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): DirectusErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Directus error:', error);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900">
            <h2 className="font-semibold text-red-900 dark:text-red-100">
              Erreur lors du chargement des données
            </h2>
            <p className="mt-1 text-sm text-red-800 dark:text-red-200">
              {this.state.error?.message || 'Une erreur inconnue est survenue.'}
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Composant de chargement générique
 */
export function DirectusLoadingFallback() {
  return (
    <div className="flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-500 dark:border-neutral-800 dark:border-t-blue-400" />
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Chargement des données...
        </p>
      </div>
    </div>
  );
}

/**
 * Composant d'erreur personnalisé
 */
interface DirectusErrorProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export function DirectusError({
  title = 'Erreur',
  message = 'Une erreur est survenue lors du chargement des données.',
  retry,
}: DirectusErrorProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900">
      <h2 className="font-semibold text-red-900 dark:text-red-100">{title}</h2>
      <p className="mt-2 text-sm text-red-800 dark:text-red-200">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}

/**
 * Composant vide personnalisé
 */
interface DirectusEmptyProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function DirectusEmpty({
  title = 'Aucune donnée',
  message = 'Il n\'y a aucune donnée à afficher.',
  icon,
}: DirectusEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{message}</p>
    </div>
  );
}

/**
 * Hook pour gérer le chargement et les erreurs
 */
export function useDirectusQuery<T>(
  queryFn: () => Promise<T>,
  dependencies: React.DependencyList = []
) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await queryFn();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

/**
 * Composant wrapper pour les requêtes Directus
 */
interface DirectusQueryProps<T> {
  queryFn: () => Promise<T>;
  children: (data: T) => React.ReactNode;
  loading?: React.ReactNode;
  error?: (error: Error) => React.ReactNode;
  empty?: React.ReactNode;
  dependencies?: React.DependencyList;
}

export function DirectusQuery<T>({
  queryFn,
  children,
  loading,
  error: errorComponent,
  empty,
  dependencies = [],
}: DirectusQueryProps<T>) {
  const { data, loading: isLoading, error } = useDirectusQuery(queryFn, dependencies);

  if (isLoading) {
    return loading || <DirectusLoadingFallback />;
  }

  if (error) {
    return errorComponent ? errorComponent(error) : <DirectusError />;
  }

  if (!data) {
    return empty || <DirectusEmpty />;
  }

  return <>{children(data)}</>;
}

/**
 * Types d'erreurs Directus
 */
export class DirectusAPIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'DirectusAPIError';
  }
}

export class DirectusAuthError extends Error {
  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'DirectusAuthError';
  }
}

export class DirectusNotFoundError extends Error {
  constructor(collection: string, id: string | number) {
    super(`Item not found in ${collection}: ${id}`);
    this.name = 'DirectusNotFoundError';
  }
}
