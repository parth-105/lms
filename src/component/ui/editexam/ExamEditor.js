"use client"

import {  useState } from "react"
import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Upload } from "lucide-react"



import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'



import AddEditQuestion from "@/component/quiz/addeditquestion"



// Mock data for video list


export default function CourseEditorModalTabs({ course }) {



    const [isOpen, setIsOpen] = useState(false)





    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button>Edit Exam</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Exam</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="course" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="course">Exam Details</TabsTrigger>
                            <TabsTrigger value="video">Question Details</TabsTrigger>
                        </TabsList>
                        <form onSubmit={handleSubmit} className="space-y-8 mt-4">
                            <TabsContent value="course">
                                <Card>
                                    <CardContent className="space-y-4 pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="Examname">Exam Name</Label>
                                            <Input
                                                id="Examname"
                                                name="name"
                                                value={examdetail.name}
                                                onChange={(e) => setCourseDetails({ ...examdetail, name: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="Examduration">Duration</Label>
                                            <Input
                                                id="Examduration"
                                                name="duration"
                                                type="number"
                                                value={examdetail.duration}
                                                onChange={(e) => setCourseDetails({ ...examdetail, duration: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="Category">Category</Label>
                                            <Select name="category" onValueChange={(value) => handleCourseChange({ target: { name: "category", value } })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="math">Mathematics</SelectItem>
                                                    <SelectItem value="science">Science</SelectItem>
                                                    <SelectItem value="history">History</SelectItem>
                                                    <SelectItem value="literature">Literature</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>


                                        <div className="space-y-2">
                                            <Label htmlFor="totalmarks">Total marks</Label>
                                            <Input
                                                id="totalmarks"
                                                name="totalMarks"
                                                type="number"
                                                value={examdetail.totalMarks}
                                                onChange={(e) => setCourseDetails({ ...examdetail, totalMarks: e.target.value })}
                                                required
                                            />
                                        </div>


                                        <div className="space-y-2">
                                            <Label htmlFor="passingmarks">passingMarks</Label>
                                            <Input
                                                id="passingmarks"
                                                name="passingMarks"
                                                type="number"
                                                value={examdetail.passingMarks}
                                                onChange={(e) => setCourseDetails({ ...examdetail, passingMarks: e.target.value })}
                                                required
                                            />
                                        </div>

                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="video">
                                {!selectedquestion ? (
                                    <Card>
                                        <CardContent className="pt-4">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Title</TableHead>
                                                        <TableHead>Actions</TableHead>

                                                        {/* <TableHead>Add</TableHead>  */}

                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {questions.map((question) => (
                                                        <TableRow key={question._id}>
                                                            <TableCell>{question.name}</TableCell>

                                                            <TableCell>
                                                                <div className="flex space-x-2">
                                                                    <Button variant="ghost" size="sm" onClick={() => handleEditVideo(question)}>
                                                                        <Pencil className="h-4 w-4 mr-2" />
                                                                        Edit
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(question._id)}>
                                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Card>
                                        <CardContent className="space-y-4 pt-4">

                                            <AddEditQuestion
                                               // setShowAddEditQuestionModal={setShowAddEditQuestionModal}
                                               // showAddEditQuestionModal={showAddEditQuestionModal}
                                                examId={params.id}
                                                refreshData={getExamData}
                                                selectedQuestion={selectedQuestion}
                                                setSelectedQuestion={setSelectedQuestion}
                                            />

                                            <Button type="button" onClick={() => setSelectedVideo(null)}>Back to Video List</Button>
                                        </CardContent>

                                    </Card>
                                )}
                                <Dialog open={isAddVideoOpen} onOpenChange={setIsAddVideoOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="mt-4">Add Video</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Add New Video</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="videoTopic" className="text-right">
                                                    Title
                                                </Label>
                                                <Input
                                                    id="videoTopic"
                                                    name="videoTopic"
                                                    value={videoTopic}
                                                    onChange={(e) => setVideoTopic(e.target.value)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="videoDescription" className="text-right">
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="videoDescription"
                                                    name="videoDescription"
                                                    value={videoDescription}
                                                    onChange={(e) => setVideoDescription(e.target.value)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="thumbnail" className="text-right">
                                                    Thumbnail
                                                </Label>
                                                <div className="col-span-3">
                                                    <Input
                                                        id="thumbnail"
                                                        name="thumbnail"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleThumbnailChange}
                                                    />
                                                    {turl && (
                                                        <img src={turl} alt="Thumbnail preview" className="mt-2 max-w-full h-auto" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="videoFile" className="text-right">
                                                    Video File
                                                </Label>
                                                <div className="col-span-3">
                                                    <Input
                                                        id="videoFile"
                                                        name="videoFile"
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={handleVideoFileChange}
                                                    />
                                                    {vurl && (
                                                        <video src={vurl} controls className="mt-2 max-w-full h-auto">
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <Button className="w-full">
                                            <Upload onClick={videoUpload} className="mr-2 h-4 w-4" />{vloading ? "loading" : "Add Video"}
                                        </Button>
                                    </DialogContent>
                                </Dialog>

                            </TabsContent>
                            <Button type="submit" className="w-full">Save Changes</Button>
                        </form>
                    </Tabs>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteConfirmation.isOpen} onOpenChange={handleDeleteCancel}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete this video? This action cannot be undone.
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleDeleteCancel}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
