"use client"
import { message } from "antd";
import React, { useEffect, useState } from "react";

import Instructions from "@/component/quiz/student/writeexam/Instructions";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from "axios";

import useLocalStorage from "@/helpers/useLocalStorage.js";
import { motion } from 'framer-motion'



import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ChevronLeft, ChevronRight, Eye, RotateCcw, XCircle } from "lucide-react";


function Page() {
  const router = useRouter();
  const [examData, setExamData] = useState(null);
  const [questions = [], setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result = {}, setResult] = useState({});
  const params = useParams();
  const { id } = params;

  
  const [view, setView] = useState("instructions");
  const [secondsLeft = 0, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
   
    const timer = setTimeout(() => setShowResult(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getExamData = async () => {
    try {
     

      const response = await axios.post(
        "/api/exam/get-exam-by-id",
        { examId: params.id }
      );

 
      if (response.data.success) {
     
        setQuestions(response.data.data.questions);
        setExamData(response.data.data);
        setSecondsLeft(response.data.duration);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
    
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };
      setResult(tempResult);
      //  dispatch(ShowLoading());
      const response = await axios.post("/api/report/add-report",
        {
          exam: params.id,
          result: tempResult,
          user: data._id
        });

    
      if (response.data.success) {
        setView("result");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {

      message.error(error.data.message);
    }
  };

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);
  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center">{examData.name}</h1>
        <div className="divider"></div>

        {view === "instructions" && (
          <Instructions
            examData={examData}
            setView={setView}
            startTimer={startTimer}
          />
        )}

        {view === "questions" && (

      


          <div className="container mx-auto p-4 max-w-2xl">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {selectedQuestionIndex + 1} :{" "}
                  {questions[selectedQuestionIndex]?.name ?? 'No question available'}
                  <span className="text-lg font-normal">Time Left: {secondsLeft}</span>
                </CardTitle>
                {/* <Progress value={(secondsLeft / 60) * 100} className="w-full" /> */}
              </CardHeader>

              <CardContent>
                {
                  Object.keys(questions[selectedQuestionIndex]?.options ?? {}).map(
                    (option, index) => {
                      return (
                        <RadioGroup key={index} value={selectedOptions[selectedQuestionIndex]} >
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            {/* <RadioGroupItem value={option} id={`option-${index}`} /> */}
                            <Label className={`p-2 rounded-md w-full cursor-pointer ${selectedOptions[selectedQuestionIndex] === option ? 'bg-black text-white' : 'bg-white'
                              }`}
                              key={index}
                              onClick={() => {
                                setSelectedOptions({
                                  ...selectedOptions,
                                  [selectedQuestionIndex]: option,
                                });
                              }}>
                              {option} :{" "}
                              {questions[selectedQuestionIndex].options[option]}
                            </Label>
                          </div>

                        </RadioGroup>
                      )
                    })
                }
              </CardContent>


              <CardFooter>
                <div className="flex  justify-between">
                  {selectedQuestionIndex > 0 && (
                    <Button
                      className="gap-4 m-4 transition-transform hover:scale-105"
                      variant="outline"
                      onClick={() => {
                        setSelectedQuestionIndex(selectedQuestionIndex - 1);
                      }}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                  )}

                  {selectedQuestionIndex < questions.length - 1 && (
                    <Button
                      className="gap-4 m-4 transition-transform hover:scale-105"
                      onClick={() => {
                        setSelectedQuestionIndex(selectedQuestionIndex + 1);
                      }}
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}

                  {selectedQuestionIndex === questions.length - 1 && (
                    <Button
                      className="gap-4 m-4 transition-transform hover:scale-105"
                      onClick={() => {
                        clearInterval(intervalId);
                        setTimeUp(true);
                        calculateResult();
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

        {view === "result" && (
      
          <div className="container mx-auto p-4 max-w-md">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Exam Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: showResult ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="flex justify-center"
                >
                  {result.verdict === "Pass" ? (
                    <CheckCircle className="w-24 h-24 text-green-500" />
                  ) : (
                    <XCircle className="w-24 h-24 text-red-500" />
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : 50 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-center mb-4">
                    {result.verdict === "Pass" ? "Congratulations! You Passed!" : "Sorry, You Didn't Pass"}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Total Marks:</span>
                        <span className="font-semibold">{examData.totalMarks}</span>
                      </div>
                      <Progress value={(result.correctAnswers.length / examData.totalMarks) * 100} className="h-2" />
                    </div>
                    <div className="flex justify-between">
                      <span>Obtained Marks:</span>
                      <span className="font-semibold">{result.correctAnswers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wrong Answers:</span>
                      <span className="font-semibold"> {result.wrongAnswers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passing Marks:</span>
                      <span className="font-semibold">{examData.passingMarks}</span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline"
                  className="gap-4 m-4"
                  onClick={() => {
                    setView("instructions");
                    setSelectedQuestionIndex(0);
                    setSelectedOptions({});
                    setSecondsLeft(examData.duration);
                  }}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Retake Exam
                </Button>

                <Button
                  className="gap-4 m-4 transition-transform hover:scale-105"
                  onClick={() => {
                    setView("review");
                  }}>
                  <Eye className="mr-2 h-4 w-4" /> Review Answers
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {view === "review" && (
        

          <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Answer Review</h1>
            {questions.map((question, index) => {
              const isCorrect =
                question.correctOption === selectedOptions[index];
              return (
                <Card key={index} className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Question {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{question.name}</p>

                    <div

                      className={`p-3 mb-2 rounded-md flex items-center ${isCorrect
                        ? 'bg-green-100 text-green-800'
                        :
                        'bg-red-100 text-red-800'
                        }`}
                    >

                      {question.correctOption === selectedOptions[index] && (
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />

                      )}
                      {question.correctOption !== selectedOptions[index] && (
                        <XCircle className="w-5 h-5 mr-2 text-red-600" />
                      )}

                      {question.correctOption === selectedOptions[index] && (
                        <span className="ml-2 text-sm">{question.options[selectedOptions[index]]}</span>
                      )}
                      {question.correctOption !== selectedOptions[index] && (
                        <span className="ml-2 text-sm">{question.options[selectedOptions[index]]} </span>
                      )}
                    </div>

                    {question.correctOption !== selectedOptions[index] && (
                      <div className="p-3 mb-2 rounded-md flex items-center 
                        bg-green-100 text-green-800 " >
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        <span className="ml-2 text-sm"> {question.options[question.correctOption]}</span>
                      </div>
                    )}

                    {question.options[selectedOptions[index]] === null && (
                      <p className="text-yellow-600 mt-2">You did not answer this question.</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}

            <div className="flex gap-2" >
              <Button
                className="gap-4 m-4 transition-transform hover:scale-105"
                onClick={() => {
                  router.push("/student/all-exam");
                }}
              >
                Close
              </Button>


              <Button
                variant="outline"
                className="gap-4 m-4 transition-transform hover:scale-105"
                onClick={() => {
                  setView("instructions");
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  setSecondsLeft(examData.duration);
                }}
              >
                Retake Exam
              </Button>

            </div>
          </div>



        )}
      </div>
    )
  );
}

export default Page;
