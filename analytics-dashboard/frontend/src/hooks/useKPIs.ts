import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import type { KPI } from '../types';

export function useKPIs() {
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get<KPI[]>('/api/kpis');
      setKPIs(data);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load KPIs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { kpis, loading, error, refetch: fetch };
}
