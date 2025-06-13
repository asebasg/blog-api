import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const { authorId } = createPostDto;
    const user = await this.prisma.user.findUnique({ where: { id: authorId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: { author: true },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return this.prisma.post.delete({ where: { id } });
  }
}