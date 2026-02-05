import React from 'react'
import { SparklesCore } from '../../components/ui/sparkles'
import { Button, Card, CardBody } from '@heroui/react'
import { Link } from 'react-router-dom'


export default function NotFound() {
  return (
    <>
      <main className='relative h-screen bg-yellow-500 '>
        <SparklesCore
          particleColor="#332454"
          particleDensity={300}
          maxSize={5}
          className="absolute inset-0"
        />

        <div className="relative z-10 flex items-center justify-center h-full">
          <Card className="bg-gray-200/50 backdrop-blur-md border border-white/30 p-12">
            <CardBody className='bg-transparent'>
              <p className='text-5xl font-black'>Page Is Not Found !!</p>
              <div className='mt-5 text-center'>
                <Button type='button' color="warning" >
                  <Link to={"/"} className='text-xl font-semibold'>
                  Back To Home
                  </Link>
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

    </>
  )
}
