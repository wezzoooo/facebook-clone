import React from 'react'
import { Outlet } from 'react-router-dom'
import { SparklesCore } from '../components/ui/sparkles'
import { Card, CardBody } from '@heroui/react'


export default function AuthLayout() {
  return (
    <>
      <main className='relative h-screen bg-sky-500'>
        <SparklesCore
          particleColor="#111"
          particleDensity={300}
          maxSize={5}
          className="absolute inset-0"
        />

        <div className="relative z-10 flex items-center justify-center h-full">
          <Card className="bg-gray-200/50 backdrop-blur-md border border-white/30 p-12">
            <CardBody className='bg-transparent'>
              <Outlet />
            </CardBody>
          </Card>
        </div>
      </main>

    </>
  )
}