import { trpc } from '../../api/client';

export function ApiTest() {
  // Using tRPC React hooks for better integration
  const appDataQuery = trpc.app.getData.useQuery();
  const healthQuery = trpc.app.getHealth.useQuery();

  // Manual refetch functions
  const refetchAppData = () => appDataQuery.refetch();
  const refetchHealth = () => healthQuery.refetch();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>tRPC API Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={refetchAppData} disabled={appDataQuery.isLoading}>
          {appDataQuery.isLoading ? 'Loading...' : 'Fetch App Data'}
        </button>
        {appDataQuery.data && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <strong>App Data:</strong> {appDataQuery.data.message}
          </div>
        )}
        {appDataQuery.error && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffe6e6', color: '#cc0000' }}>
            <strong>App Data Error:</strong> {appDataQuery.error.message}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={refetchHealth} disabled={healthQuery.isLoading}>
          {healthQuery.isLoading ? 'Loading...' : 'Check Health'}
        </button>
        {healthQuery.data && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e6ffe6' }}>
            <strong>Health Status:</strong> {healthQuery.data.status}<br />
            <strong>Timestamp:</strong> {healthQuery.data.timestamp}
          </div>
        )}
        {healthQuery.error && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffe6e6', color: '#cc0000' }}>
            <strong>Health Error:</strong> {healthQuery.error.message}
          </div>
        )}
      </div>

      {(appDataQuery.isError || healthQuery.isError) && (
        <div style={{ padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
          <strong>Note:</strong> Make sure the backend server is running on http://localhost:3000
        </div>
      )}
    </div>
  );
}
