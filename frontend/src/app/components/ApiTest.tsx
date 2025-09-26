import { useState } from 'react';
import { AppDataDto, HealthResponseDto } from '@delbot/shared';
import { api } from '../../api/client';

export function ApiTest() {
  const [appData, setAppData] = useState<AppDataDto | null>(null);
  const [healthData, setHealthData] = useState<HealthResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getData();
      if (response.status === 200) {
        setAppData(response.body);
      }
    } catch (err) {
      setError('Failed to fetch app data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getHealth();
      if (response.status === 200) {
        setHealthData(response.body);
      }
    } catch (err) {
      setError('Failed to fetch health data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>TS-Rest API Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={fetchAppData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch App Data'}
        </button>
        {appData && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <strong>App Data:</strong> {appData.message}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={fetchHealthData} disabled={loading}>
          {loading ? 'Loading...' : 'Check Health'}
        </button>
        {healthData && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e6ffe6' }}>
            <strong>Health Status:</strong> {healthData.status}<br />
            <strong>Timestamp:</strong> {healthData.timestamp}
          </div>
        )}
      </div>

      {error && (
        <div style={{ padding: '10px', backgroundColor: '#ffe6e6', color: '#cc0000' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
