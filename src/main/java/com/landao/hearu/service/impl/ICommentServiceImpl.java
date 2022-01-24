package com.landao.hearu.service.impl;

import com.landao.hearu.entity.Comment;
import com.landao.hearu.mapper.CommentMapper;
import com.landao.hearu.service.ICommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 评论 服务实现类
 * </p>
 *
 * @author 常珂洁
 * @since 2022-01-24
 */
@Service
public class ICommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements ICommentService {

}
