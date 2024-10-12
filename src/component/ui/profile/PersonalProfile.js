"use client"
import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import useLocalStorage from '@/helpers/useLocalStorage.js';

export default function PersonalProfile() {
    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        // This code will only run on the client side
        const storedData = localStorage.getItem('e-learning-user');
       
      //  setld(storedData);
      if(storedData){
        const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
  
      }
     
      }, []);

      useEffect(() => {
        // This will run whenever userData changes
        if (userData) {
        
        }
      }, [userData]);
  return (
    <section className="vh-100" >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-black font-bold text-2xl flex flex-col"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <div className='flex items-center justify-center flex-col' >
                  <MDBCardImage src={userData?.photoURL}
                    alt="Avatar" className="my-5 align-self:center mt-4 w-32 h-32 object-cover rounded-full " fluid />
                  <MDBTypography tag="h5">{userData?.name}</MDBTypography>
                  <MDBCardText className='font-semibold' >ROLE:{userData?.isInstructor ? "Instructor" :"Student"}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                  </div>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4 ">
                    <MDBTypography tag="h6" className='font-bold text-2xl' >Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6" className='font-semibold text-2xl'>Email</MDBTypography>
                        <MDBCardText className=" text-black">{userData?.email}</MDBCardText>
                      </MDBCol>
                      {/* <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6" className='font-semibold text-2xl'>Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol> */}
                    </MDBRow>

                    {/* <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow> */}

                  
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}