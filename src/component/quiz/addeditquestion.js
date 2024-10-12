import { Form, message, Modal } from "antd";
import React from "react";

import axios from "axios";
import { Button } from "@/components/ui/button";


function AddEditQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion,
  seteditquestion
}) {

  const onFinish = async (values) => {
    try {
     
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };

      let response
      if (selectedQuestion) {

        response = await axios.post(
          "/api/exam/edit-question-in-exam",
          {
            ...requiredPayload,
            questionId: selectedQuestion._id
          }
        );

    
      }
      else {
       
        response = await axios.post(
          "/api/exam/add-question-to-exam",
          requiredPayload
        );
      

      }
      if (response.data.success) {
        message.success(response.data.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.data.message);
      }
      setSelectedQuestion(null)
     
    } catch (error) {
      
      message.error(error.data.message);
    }
  };

  return (
    <Modal
      title={selectedQuestion ? "Edit Question" : "Add Question"}
      visible={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false)
        setSelectedQuestion(null)
      }}
    >
      <Form onFinish={onFinish} layout="vertical"
        initialValues={{
          name: selectedQuestion?.name,
          A: selectedQuestion?.options?.A,
          B: selectedQuestion?.options?.B,
          C: selectedQuestion?.options?.C,
          D: selectedQuestion?.options?.D,
          correctOption: selectedQuestion?.correctOption,
        }}
      >
        <Form.Item name="name" label="Question">
          <input type="text" />
        </Form.Item>
        <Form.Item name="correctOption" label="Correct Option">
          <input type="text" />
        </Form.Item>

        <div className="flex gap-3">
          <Form.Item name="A" label="Option A">
            <input type="text" />
          </Form.Item>
          <Form.Item name="B" label="Option B">
            <input type="text" />
          </Form.Item>
        </div>
        <div className="flex gap-3">
          <Form.Item name="C" label="Option C">
            <input type="text" />
          </Form.Item>
          <Form.Item name="D" label="Option D">
            <input type="text" />
          </Form.Item>
        </div>

        <div className="flex justify-end mt-2 gap-3">
          <Button
            className=" bg-gray-300 transition-transform hover:scale-105"
            type="button"
            variant="outline"
            onClick={() => setShowAddEditQuestionModal(false)}
          >
            Cancel
          </Button>
          <Button onClick={() =>seteditquestion(true)} className="transition-transform hover:scale-105">Save</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;
