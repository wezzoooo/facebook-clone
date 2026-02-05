

import { useEffect, useId, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { motion, useAnimation } from "framer-motion"


const cn = (...classes) => classes.filter(Boolean).join(" ")

export function SparklesCore({
    id,
    className,
    background,
    minSize = 1,
    maxSize = 3,
    speed = 4,
    particleColor = "#ffffff",
    particleDensity = 120,
}) {
    const [init, setInit] = useState(false)
    const controls = useAnimation()
    const generatedId = useId()

    useEffect(() => {
        initParticlesEngine(async engine => {
            await loadSlim(engine)
        }).then(() => setInit(true))
    }, [])

    const particlesLoaded = async container => {
        if (container) {
            controls.start({
                opacity: 1,
                transition: { duration: 1 },
            })
        }
    }

    return (
        <motion.div animate={controls} className={cn("opacity-0", className)}>
            {init && (
                <Particles
                    id={id || generatedId}
                    className="w-full h-full"
                    particlesLoaded={particlesLoaded}
                    options={{
                        background: {
                            color: { value: background || "transparent" },
                        },
                        fullScreen: {
                            enable: false,
                            zIndex: 1,
                        },
                        particles: {
                            number: {
                                value: particleDensity,
                                density: { enable: true, area: 800 },
                            },
                            color: { value: particleColor },
                            opacity: {
                                value: { min: 0.1, max: 1 },
                                animation: {
                                    enable: true,
                                    speed,
                                    sync: false,
                                },
                            },
                            size: {
                                value: { min: minSize, max: maxSize },
                            },
                            move: {
                                enable: true,
                                speed: { min: 0.1, max: 1 },
                            },
                            shape: { type: "circle" },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </motion.div>
    )
}

export default SparklesCore
