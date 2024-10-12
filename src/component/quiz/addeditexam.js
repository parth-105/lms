"use client"
import { Col, Form, message, Row, Table } from "antd";
import React, { useEffect } from "react";

import axios from "axios";

import { Tabs } from "antd";
import AddEditQuestion from "@/component/quiz/addeditquestion";
const { TabPane } = Tabs;
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useLocalStorage from "@/helpers/useLocalStorage.js";
import { Button } from "@/components/ui/button";



function AddEditExam() {

 const router = useRouter();
  const [examData, setExamData] = React.useState(null);
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const [data, setData] = useLocalStorage('e-learning-user', '');

 const params = useParams();
  const { id } = params;

  const onFinish = async(values) => {
    try {
    
      let response;

      if (params.id) {
        response = await axios.post("/api/exam/edit-exam-by-id",{...values,examId: params.id});
      
       
      } else {
       
        response = await axios.post("/api/exam/add-exam", {...values,instructor:data._id});
      
      }
      if (response.data.success) {
        message.success(response.data.message);
        router.push("/instructor/exams");
      } else {
       
        message.error(response.message);
      }
    
    } catch (error) {
    
   
      message.error("validate error ");
    }
  };

  const getExamData = async () => {
    try {
      //dispatch(ShowLoading());
      const response = await axios.post(
        "/api/exam/get-exam-by-id",
        {examId: params.id}
      );
      // const response = await getExamById({
      //   examId: params.id,
      // });
    //  dispatch(HideLoading());
      if (response.data.success) {
        setExamData(response.data.data);
      } else {
      
        message.error(response.message);
      }
    } catch (error) {
      //dispatch(HideLoading());
      message.error(error.message);
    
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  const deleteQuestion = async (questionId) => {
    try {
    //  dispatch(ShowLoading());


    const response = await axios.post(
      "/api/exam/delete-question-in-exam",
      { questionId,
        examId : params.id}
    );

      if (response.data.success) {
       
        message.success(response.data.message);
        getExamData();
      } else {
       
        message.error(response.message);
      }
    } catch (error) {
   
      message.error(error.message);
    }
  };

  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key, index) => {
          return (
            <div key={index}>
              {key} : {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
      render: (text, record) => {
        return ` ${record.correctOption} : ${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2 bg-red-500">
          <Button
            className="ri-pencil-line bg-red-500 transition-transform hover:scale-105"
            onClick={() => {
              setSelectedQuestion(record);
              setShowAddEditQuestionModal(true);
            }}
          >edit</Button>
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteQuestion(record._id);
            }}
          >delete</i>
        </div>
      ),
    },
  ];

  return (
    <div>
    
      <div className="divider"></div>

      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <select name="" id="">
                      <option value="">Select Category</option>
                      <option value="Javascript">Javascript</option>
                      <option value="React">React</option>
                      <option value="Node">Node</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="GK">GK</option>
                      <option value="ML">Machine Learning</option>
                      <option value="ebusiness">E-business</option>

                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <Button
                 variant="outlone"
                  className="bg-gray-300 transition-transform hover:scale-105  "
                  onClick={() => router.push("/instructor/exams")}
                >
                  Cancel
                </Button>
                <Button className="transition-transform hover:scale-105"  type="submit">
                  Save
                </Button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Questions" key="2">
                <div className="flex justify-end">
                  <Button
                    className="transition-transform hover:scale-105"
                    type="button"
                    onClick={() => setShowAddEditQuestionModal(true)}
                  >
                    Add Question
                  </Button>
                </div>

                <Table
                  columns={questionsColumns}
                  dataSource={examData?.questions || []}
                />
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}

      {showAddEditQuestionModal && (
        <AddEditQuestion
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          showAddEditQuestionModal={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
}

export default AddEditExam;
