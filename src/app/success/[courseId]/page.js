"use client"
// pages/success.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast"
import useLocalStorage from '@/helpers/useLocalStorage.js';
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const Success = ({ params }) => {
  const { toast } = useToast()
  const router = useRouter();
  const [data, setData] = useLocalStorage('e-learning-user', '');
 

  const courseId = params.courseId;

  useEffect(() => {

    const updatePurchase = async () => {
      try {

        await axios.post('/api/update', {
          userId: data._id,
          courseId: courseId,
          isPurchased: true
        });
        router.push(`/course/videos/${courseId}`);
        
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          
        })
      }
    };

    updatePurchase();

  }, [courseId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center text-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
          </motion.div>
          <motion.h1
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Thank you for your purchase. Your transaction has been completed successfully.
          </motion.p>
          <motion.div
            className="space-y-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Transaction ID:</span>
              <span className="text-muted-foreground">#123456789</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Amount Paid:</span>
              <span className="text-muted-foreground">$99.99</span>
            </div> */}
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Payment Method:</span>
              <span className="text-muted-foreground">Credit Card</span>
            </div>
          </motion.div>
          <motion.div
            className="mt-8 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {/* <Button className="w-full">Back to Home</Button> */}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
