import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(CreateCommentDto: CreateCommentDto) {
    const { authorId } = CreateCommentDto;
    const user = await this.prisma.user.findUnique({ where: { id: authorId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.prisma.comment.create({
      data: CreateCommentDto,
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

  async update(id: number, UpdateCommentDto: UpdateCommentDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return this.prisma.post.update({
      where: { id },
      data: UpdateCommentDto,
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