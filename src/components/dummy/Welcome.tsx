import { ReactNode } from 'react';
import {
  Button,
  Image,
  Paper,
  Text,
  Tooltip,
  Box,
  Group,
  Stack,
  Container,
  Badge
} from '@inexture/core';
import Redux from '@assets/img/logo/redux-logo.svg';
import Mantine from '@assets/img/logo/mantine-logo.svg';
import React from '@assets/img/logo/react-logo.svg';
import Prettier from '@assets/img/logo/prettier.svg';
import TypeScript from '@assets/img/logo/typescript.svg';
import EsLint from '@assets/img/logo/eslint.svg';
import { Link } from 'react-router';
import ApiExample from '@components/dummy/ApiExample.tsx';

const techStacks: {
  label: string;
  icon: ReactNode;
  color: string;
  description: string;
}[] = [
  { label: 'React', icon: React, color: '#61DAFB', description: 'UI Library' },
  {
    label: 'RTK Query',
    icon: Redux,
    color: '#764ABC',
    description: 'State Management'
  },
  {
    label: 'Mantine',
    icon: Mantine,
    color: '#339AF0',
    description: 'UI Components'
  },
  {
    label: 'Prettier',
    icon: Prettier,
    color: '#F7B93E',
    description: 'Code Formatter'
  },
  {
    label: 'TypeScript',
    icon: TypeScript,
    color: '#3178C6',
    description: 'Type Safety'
  },
  {
    label: 'ESLint',
    icon: EsLint,
    color: '#4B32C3',
    description: 'Code Linting'
  }
];

const Welcome = () => {
  return (
    <Box
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)'
      }}
    >
      {/* Animated Background */}
      <Box
        className="absolute inset-0 opacity-20 animate-gradient"
        style={{
          background:
            'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #8b5cf6 75%, #3b82f6 100%)'
        }}
      />

      {/* Dark overlay for better contrast */}
      <Box
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at center, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
        }}
      />

      {/* Main Content */}
      <Container size="xl" className="relative z-10">
        <Stack gap="xl" py="xl">
          {/* Hero Section */}
          <Box className="text-center py-16">
            <Box className="mb-8 transform transition-all duration-500 hover:scale-105 hover-lift">
              <Tooltip
                label="Made by Inexture Solutions"
                styles={{
                  tooltip: {
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '12px 20px',
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }
                }}
              >
                <Link
                  to="https://github.com/inexture-solutions"
                  target="_blank"
                  className="inline-block"
                >
                  <Image
                    src="https://www.inexture.com/wp-content/uploads/2023/06/inx-white-logos.png"
                    mx="auto"
                    maw={280}
                    className="transition-all duration-300 hover:brightness-110"
                  />
                </Link>
              </Tooltip>
            </Box>

            <Stack gap="md" align="center">
              <Badge
                size="lg"
                variant="filled"
                style={{
                  background: 'rgba(96, 165, 250, 0.2)',
                  color: '#60a5fa',
                  border: '1px solid rgba(96, 165, 250, 0.3)'
                }}
              >
                ✨ Modern Development Stack
              </Badge>

              <Text
                component="h1"
                size="3.5rem"
                fw={800}
                lh={1.1}
                className="gradient-text animate-pulse-glow responsive-title"
              >
                Quick Starter Template
              </Text>

              <Text
                size="xl"
                maw={650}
                mx="auto"
                lh={1.6}
                className="animate-fade-in-up responsive-subtitle text-muted-bright"
                style={{
                  animationDelay: '0.2s'
                }}
              >
                A powerful, fully customized and production-ready starter
                project built with modern technologies and best practices for
                rapid development.
              </Text>
            </Stack>

            <Group justify="center" mt="xl" gap="md">
              <Button
                component={Link}
                to="/contact"
                size="lg"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'purple', deg: 45 }}
                className="hover-lift"
                leftSection="📧"
                style={{ color: '#fff' }}
              >
                Get in Touch
              </Button>

              <Button
                component="a"
                href="https://github.com/inexture-solutions"
                target="_blank"
                size="lg"
                radius="xl"
                variant="outline"
                className="hover-lift"
                leftSection="🚀"
                style={{
                  color: '#60a5fa',
                  borderColor: 'rgba(96, 165, 250, 0.5)',
                  background: 'rgba(96, 165, 250, 0.05)'
                }}
              >
                Explore Projects
              </Button>
            </Group>
          </Box>

          {/* Tech Stack Section */}
          <Box>
            <Stack gap="xl" align="center">
              <Box className="text-center">
                <Text size="2rem" fw={700} mb="sm" className="gradient-text">
                  Built with Modern Technologies
                </Text>
                <Text
                  size="lg"
                  className="text-muted-bright"
                  maw={500}
                  mx="auto"
                >
                  Carefully selected tools and frameworks for optimal
                  development experience
                </Text>
              </Box>

              <Box className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  {techStacks.map((stack, index) => (
                    <Tooltip
                      key={stack.label}
                      label={
                        <Box>
                          <Text fw={600}>{stack.label}</Text>
                          <Text size="sm" c="dimmed">
                            {stack.description}
                          </Text>
                        </Box>
                      }
                      styles={{
                        tooltip: {
                          padding: '12px 16px',
                          background: 'rgba(0,0,0,0.9)',
                          border: `1px solid ${stack.color}20`,
                          backdropFilter: 'blur(10px)'
                        }
                      }}
                    >
                      <Paper
                        p="xl"
                        radius="xl"
                        className="group glass card-hover hover-lift border border-gray-100"
                        style={{
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <Stack
                          align="center"
                          gap="sm"
                          className="relative z-10"
                        >
                          <Box
                            className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                            style={{
                              background: `${stack.color}15`,
                              border: `2px solid ${stack.color}20`
                            }}
                          >
                            <Image
                              maw={48}
                              src={stack.icon}
                              alt={stack.label}
                              className="transition-all duration-300 group-hover:brightness-110"
                            />
                          </Box>

                          <Box className="text-center">
                            <Text
                              fw={600}
                              size="sm"
                              className="card-title group-hover:text-accent transition-colors"
                            >
                              {stack.label}
                            </Text>
                            <Text
                              size="xs"
                              className="opacity-0 group-hover:opacity-100 transition-all duration-300 card-muted"
                            >
                              {stack.description}
                            </Text>
                          </Box>
                        </Stack>
                      </Paper>
                    </Tooltip>
                  ))}
                </div>
              </Box>
            </Stack>
          </Box>

          {/* Projects Section */}
          <Box mt="xl">
            <ApiExample />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Welcome;
