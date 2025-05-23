import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { Activity, Weight, Ruler, Droplet, Footprints, Dumbbell } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Import of components
import MetricCard from './components/overview/MetricCard';
import IMCCard from './components/overview/IMCCard';
import WaterGlassChart from './components/overview/WaterGlassChart';
import StepsChart from './components/overview/StepsChart';
import BodyCompositionChart from './components/overview/BodyComposition';
import ExerciseChart from './components/overview/ExerciseChart';
import DailyGoalsCard from './components/overview/DailyGoalsCard';
import ActivityCard from './components/overview/ActivityCard';

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const { user } = useAuth();

  // Default goals
  const goals = {
    water_goal: 2000, // ml
    steps_goal: 10000,
    exercise_goal: 60 // minutes
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await api.user.getCurrentStats(user.id);
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            <Activity className="h-8 w-8 animate-spin text-purple-600" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </div>
    );
  }

  const dailyActivities = [
    { 
      name: 'Agua', 
      progress: Math.round((stats.water_consumed * 250 / goals.water_goal) * 100),
      color: '#38bdf8' 
    },
    { 
      name: 'Pasos', 
      progress: Math.round((stats.steps / goals.steps_goal) * 100), 
      color: '#4ade80' 
    },
    { 
      name: 'Ejercicio', 
      progress: Math.round((stats.exercises?.reduce((acc, ex) => acc + ex.duration, 0) / goals.exercise_goal) * 100), 
      color: '#8b5cf6' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Panel General
          </h1>
          <p className="text-gray-500 mt-1">
            Resumen de tus métricas de salud actuales
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Peso Actual"
            value={stats.weight}
            unit="kg"
            icon={Weight}
            color="purple"
            description="Tu peso corporal actual"
            height={stats.height}
          />
          <MetricCard
            title="Altura"
            value={stats.height}
            unit="cm"
            icon={Ruler}
            color="cyan"
            description="Tu altura actual"
          />
          <IMCCard 
            value={stats.bmi} 
            className="md:col-span-2 lg:col-span-1"
          />

          {stats.body_composition && (
            <Card className="md:col-span-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm z-0" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Composición Corporal
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <BodyCompositionChart data={stats.body_composition} />
              </CardContent>
            </Card>
          )}

          <DailyGoalsCard activities={dailyActivities} />

          <ActivityCard
            title="Agua Consumida"
            icon={Droplet}
            iconColor="bg-blue-50 text-blue-500"
            value={stats.water_consumed >= Math.ceil(goals.water_goal / 250)
              ? `${stats.water_consumed} vasos`
              : `${stats.water_consumed}/${Math.ceil(goals.water_goal / 250)} vasos`
            }
          >
            <WaterGlassChart consumed={stats.water_consumed} total={goals.water_goal} />
          </ActivityCard>

          <ActivityCard
            title="Pasos"
            icon={Footprints}
            iconColor="bg-green-50 text-green-500"
            value={
              (stats.steps >= 1000 ? `${(stats.steps / 1000).toFixed(1).replace('.0', '')}k` : stats.steps) +
              (stats.steps >= goals.steps_goal ? ' pasos' : `/${(goals.steps_goal / 1000).toFixed(1).replace('.0', '')}k pasos`)
            }
          >
            <StepsChart current={stats.steps} goal={goals.steps_goal} />
          </ActivityCard>

          <ActivityCard
            title="Ejercicio"
            icon={Dumbbell}
            iconColor="bg-violet-50 text-violet-500"
            value={stats.exercises?.reduce((acc, ex) => acc + ex.duration, 0) >= goals.exercise_goal
              ? `${stats.exercises?.reduce((acc, ex) => acc + ex.duration, 0)} min`
              : `${stats.exercises?.reduce((acc, ex) => acc + ex.duration, 0)}/${goals.exercise_goal} min`
            }
          >
            <ExerciseChart exercises={stats.exercises || []} />
          </ActivityCard>
        </div>
      </div>
    </div>
  );
};

export default Overview;