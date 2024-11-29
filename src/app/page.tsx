"use client";

import AnimatedCount from "@/components/AnimatedCount";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const [sliderValue, setSliderValue] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsRemaining((s) => {
        if (s > 0) {
          return s - 1;
        }
        return s;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Countdown Timer */}
      <motion.div
        animate={{
          rotate:
            secondsRemaining == 0
              ? [0, 5, -5, 5, -2.5, 2.5, -1.25, 1.25, 0]
              : [0],
        }}
        transition={{ delay: 1, repeat: Infinity, repeatDelay: 1 }}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Countdown Timer</CardTitle>
            <CardDescription>Using Framer Motion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">
              <AnimatedCount value={Math.floor(secondsRemaining / 60)} />
              <span>:</span>
              <AnimatedCount value={secondsRemaining % 60} />
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button onClick={() => setSecondsRemaining((s) => s + 10)}>
              +10s
            </Button>
            <Button onClick={() => setSecondsRemaining((s) => s + 30)}>
              +30s
            </Button>
            <Button onClick={() => setSecondsRemaining((s) => s + 60)}>
              +60s
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Rating Slider */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Rating Slider</CardTitle>
          <CardDescription>Using shadcn/ui</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl flex items-baseline gap-1.5">
            <AnimatedCount value={sliderValue} padding={0} duration={0.3} />
            <span className="text-sm font-medium leading-none text-inherit">
              / 5
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Slider
            value={[sliderValue]}
            onValueChange={(v) => setSliderValue(v[0])}
            min={0}
            max={5}
            step={1}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
