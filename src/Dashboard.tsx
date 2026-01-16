import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/data';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis } from 'recharts';
import type { Schema } from '../amplify/data/resource';
import './App.css';

const client = generateClient<Schema>();

export default function App() {
  const [results, setResults] = useState<Schema['TestResult']['type'][]>([]);

  // 1. Real-time Subscription to DynamoDB
  useEffect(() => {
    const sub = client.models.TestResult.observeQuery().subscribe({
      next: ({ items }) => {
        setResults([...items].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      },
    });
    return () => sub.unsubscribe();
  }, []);

  // 2. Metrics Calculation with defensive number casting
  const total = results.length;
  const passed = results.filter(r => r.status === 'PASSED').length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : "0";

  const avgDuration = total > 0
    ? (results.reduce((acc, curr) => acc + Number(curr.duration || 0), 0) / total / 1000).toFixed(2)
    : "0";

  // 3. Chart Data Formatting
  const chartData = [...results].reverse().map(r => ({
    time: new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    duration: Number(r.duration || 0)
  }));

  return (
    <div className="portfolio-container">
      <header className="senior-header">
        <div>
          <h1>Intelligent Quality Engineering Hub</h1>
          <p>Agentic AI & Observability-Driven Assurance | 15+ Years of Full-Stack Quality Advocacy</p>
        </div>
        <div className="badge-row">
          <span className="global-stat">Nodes: ap-southeast-2</span>
          <span className="global-stat">Avg Latency: {avgDuration}s</span>
          <span className={`global-stat ${Number(passRate) < 90 && total > 0 ? 'alert' : ''}`}>
            Pass Rate: {passRate}%
          </span>
          <span><Link to="/about" className="info-link">How it's built →</Link></span>
        </div>
      </header>

      <section className="analytics-section">
        <div className="chart-box" style={{ height: '200px', width: '100%' }}>
          <h3>Execution Performance Trend (ms)</h3>
          {total < 2 ? (
             <p className="empty-chart-text">Insufficient data for trend line. Run more tests...</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 15, right: 15, left: 15, bottom: 20 }}
                >
                  <Line
                    type="monotone"
                    dataKey="duration"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#38bdf8', strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                  <XAxis dataKey="time" hide />
                  <YAxis
                        hide
                        domain={['dataMin - 100', 'dataMax + 100']}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="dashboard-grid">
        {results.length === 0 && (
          <div className="empty-state">
            <p>Waiting for Playwright test telemetry...</p>
            <code>npx playwright test</code>
          </div>
        )}

        {results.map((res) => (
          <div key={res.id} className="card">
            <div className="card-header">
              <h3>{res.testName}</h3>
              <span className={`status-badge status-${res.status}`}>
                {res.status}
              </span>
            </div>

            <div className="framework-tag">
              Engine: {res.framework} | {new Date(res.createdAt).toLocaleTimeString()}
            </div>

            {res.status === 'FAILED' ? (
              <>
                <div className="log-preview">{res.errorLog}</div>
                <div className="ai-analysis-box">
                  <strong>💡 AI Root Cause Analysis</strong>
                  <p>{res.aiRootCause || "Analysis in progress..."}</p>
                </div>
              </>
            ) : (
              <div className="log-preview success-log">
                ✓ Test assertions passed successfully.
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
