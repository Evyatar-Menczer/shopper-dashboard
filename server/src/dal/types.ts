export interface ISalesDal {
  getAll(): Promise<any[]>
  getByMetrics(metrics: string): Promise<any>
}
