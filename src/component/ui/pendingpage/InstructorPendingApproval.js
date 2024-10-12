
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, HelpCircle, Mail } from "lucide-react"


export default function InstructorPendingApproval() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock className="h-10 w-10 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Approval Pending</CardTitle>
          <CardDescription>
            Your instructor account is currently under review
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Thank you for your interest in becoming an instructor. Our team is reviewing your application to ensure the quality of our platform.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" />
              <span>Application received</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-yellow-500" />
              <span>Review in progress</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <CheckCircle className="text-muted-foreground" />
              <span>Approval decision</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <HelpCircle className="h-4 w-4" />
            <span>Typical approval time: 2-3 business days</span>
          </div>
          
        </CardFooter>
      </Card>
    </div>
  )
}