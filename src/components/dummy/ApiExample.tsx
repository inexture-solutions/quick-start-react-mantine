import { FC } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Paper,
  Skeleton,
  Text,
  Badge,
  Group,
  Stack
} from '@inexture/core';
import { useGetReposQuery } from '@services/dummy.service.ts';
import dayjs from 'dayjs';
import { AiFillEye, AiFillGithub } from '@inexture/core/icons/ai';

const LoadingRepoCard = () => {
  return (
    <Paper
      shadow="lg"
      p="xl"
      radius="xl"
      className="glass card-hover border border-gray-100"
    >
      <Stack gap="md">
        <Skeleton w={70} h={70} radius="50%" />
        <Skeleton h={24} />
        <Skeleton h={60} />
        <Stack gap="xs">
          <Skeleton h={16} />
          <Skeleton h={16} />
        </Stack>
        <Group gap="xs">
          <Skeleton h={36} style={{ flex: 1 }} />
          <Skeleton h={36} style={{ flex: 1 }} />
        </Group>
      </Stack>
    </Paper>
  );
};

const ApiExample: FC = () => {
  const { data, isLoading } = useGetReposQuery('inexture-solutions');

  return (
    <Box>
      <Stack gap="xl" align="center" mb="xl">
        <Box className="text-center">
          <Text size="2rem" fw={700} mb="sm" className="gradient-text">
            Featured Projects
          </Text>
          <Text size="lg" className="text-muted-bright" maw={500} mx="auto">
            Explore our latest open-source contributions and innovative
            solutions
          </Text>
        </Box>
      </Stack>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingRepoCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.slice(0, 8).map((item, index) => {
            const isPrivate = item?.private;
            const hasHomepage = item?.homepage;

            return (
              <Paper
                key={item?.id}
                shadow="lg"
                p="xl"
                radius="xl"
                className="group glass card-hover hover-lift border border-gray-100"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Stack className="relative z-10 h-full" justify="space-between">
                  <Box>
                    {/* Project Icon */}
                    <Box className="text-center mb-4">
                      <ActionIcon
                        variant="light"
                        size={70}
                        radius="50%"
                        className="transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: 'rgba(96, 165, 250, 0.1)',
                          border: '2px solid rgba(96, 165, 250, 0.2)'
                        }}
                      >
                        <AiFillGithub size={30} className="text-blue-400" />
                      </ActionIcon>
                    </Box>

                    {/* Project Title */}
                    <Text
                      size="lg"
                      lineClamp={1}
                      fw={600}
                      className="capitalize mb-2 text-center card-title group-hover:text-accent transition-colors"
                      title={item?.name?.replaceAll('-', ' ')}
                    >
                      {item?.name?.replaceAll('-', ' ')}
                    </Text>

                    {/* Project Description */}
                    <Text
                      size="sm"
                      lineClamp={3}
                      className="text-center mb-4 leading-relaxed card-text"
                      style={{ minHeight: '60px' }}
                    >
                      {item?.description || 'No description available'}
                    </Text>

                    {/* Badges */}
                    <Group justify="center" gap="xs" mb="md">
                      {isPrivate && (
                        <Badge
                          size="xs"
                          color="red"
                          variant="filled"
                          style={{ color: '#fff' }}
                        >
                          Private
                        </Badge>
                      )}
                      <Badge
                        size="xs"
                        color="blue"
                        variant="filled"
                        style={{ color: '#fff' }}
                      >
                        {item?.language || 'Code'}
                      </Badge>
                      {item?.stargazers_count > 0 && (
                        <Badge
                          size="xs"
                          color="yellow"
                          variant="filled"
                          style={{ color: '#000' }}
                        >
                          ⭐ {item?.stargazers_count}
                        </Badge>
                      )}
                    </Group>

                    {/* Project Details */}
                    <List size="sm" spacing="xs" className="card-muted">
                      <ListItem className="flex items-center">
                        📅 Updated:{' '}
                        {dayjs(item?.pushed_at).format('MMM DD, YYYY')}
                      </ListItem>
                      <ListItem className="flex items-center">
                        📜 License: {item?.license?.spdx_id ?? 'MIT'}
                      </ListItem>
                    </List>
                  </Box>

                  {/* Action Buttons */}
                  <Group gap="xs" mt="md">
                    <Button
                      component="a"
                      href={item?.html_url}
                      target="_blank"
                      size="sm"
                      radius="lg"
                      variant="light"
                      color="blue"
                      fullWidth
                      leftSection={<AiFillGithub size={16} />}
                      className="hover-lift"
                      style={{
                        background: 'rgba(96, 165, 250, 0.1)',
                        color: '#60a5fa',
                        border: '1px solid rgba(96, 165, 250, 0.3)'
                      }}
                    >
                      Source
                    </Button>

                    {hasHomepage && (
                      <Button
                        component="a"
                        href={item?.homepage}
                        target="_blank"
                        size="sm"
                        radius="lg"
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'purple', deg: 45 }}
                        fullWidth
                        leftSection={<AiFillEye size={16} />}
                        className="hover-lift"
                        style={{ color: '#fff' }}
                      >
                        Demo
                      </Button>
                    )}
                  </Group>
                </Stack>
              </Paper>
            );
          })}
        </div>
      )}

      {/* View More Button */}
      {data && data.length > 8 && (
        <Box className="text-center mt-8">
          <Button
            component="a"
            href="https://github.com/inexture-solutions"
            target="_blank"
            size="lg"
            radius="xl"
            variant="outline"
            className="hover-lift"
            style={{
              color: '#60a5fa',
              borderColor: 'rgba(96, 165, 250, 0.5)',
              background: 'rgba(96, 165, 250, 0.05)'
            }}
          >
            View All Projects →
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ApiExample;
