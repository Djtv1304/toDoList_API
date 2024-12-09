import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching tasks' }), { status: 500 });
  }
}

export async function POST(req) {
  const { title, description } = await req.json();
  try {
    const newTask = await prisma.task.create({
      data: { title, description, status: 'pending' },
    });
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating task' }), { status: 500 });
  }
}

export async function PATCH(req) {
  const { id, status } = await req.json();
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { status },
    });
    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating task' }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    return new Response(JSON.stringify({ message: 'Task deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting task' }), { status: 500 });
  }
}