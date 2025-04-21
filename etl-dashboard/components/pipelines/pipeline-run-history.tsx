import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle, Pause } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type RunStatus = "completed" | "failed" | "running" | "paused"

interface PipelineRun {
  id: string
  status: RunStatus
  startTime: Date
  endTime?: Date
  recordsProcessed?: number
  error?: string
}

interface PipelineRunHistoryProps {
  runs: PipelineRun[]
  className?: string
}

export function PipelineRunHistory({ runs, className }: PipelineRunHistoryProps) {
  const getStatusIcon = (status: RunStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: RunStatus) => {
    const classes = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      running: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    }

    return (
      <Badge className={classes[status]} variant="outline">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Run History</CardTitle>
        <CardDescription>
          Recent pipeline executions and their statuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {runs.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-6">
              No pipeline runs found
            </p>
          ) : (
            runs.map((run, index) => (
              <div key={run.id} className="relative pb-8">
                {index < runs.length - 1 && (
                  <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-muted"></span>
                )}
                <div className="relative flex space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {getStatusIcon(run.status)}
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm font-medium">
                        Run #{run.id}{" "}
                        {run.recordsProcessed && (
                          <span className="text-muted-foreground">
                            ({run.recordsProcessed} records)
                          </span>
                        )}
                      </p>
                      {run.error && (
                        <p className="mt-0.5 text-sm text-red-500">
                          Error: {run.error}
                        </p>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-sm">
                      {getStatusBadge(run.status)}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {run.status === "running"
                          ? `Started ${formatDistanceToNow(run.startTime)} ago`
                          : run.endTime
                          ? `${formatDistanceToNow(run.endTime)} ago`
                          : `${formatDistanceToNow(run.startTime)} ago`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 