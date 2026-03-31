import React from 'react'
import { SparklesCore } from '../../components/ui/sparkles'
import { Button, Card, CardBody } from '@heroui/react'
import { Link } from 'react-router-dom'


export default function NotFound() {
  return (
    <>
      <main className="relative min-h-screen bg-yellow-500">
  
  <SparklesCore
    particleColor="#332454"
    particleDensity={300}
    maxSize={5}
    className="absolute inset-0"
  />

  {/* CENTER WRAPPER */}
  <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
    
    <Card className="bg-gray-200/50 backdrop-blur-md border border-white/30 p-12">
      
      <CardBody className="bg-transparent text-center">
        <p className="text-3xl sm:text-5xl font-black">
          Page Is Not Found !!
        </p>

        <div className="mt-5">
          <Button color="warning">
            <Link to="/" className="text-lg font-semibold">
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
