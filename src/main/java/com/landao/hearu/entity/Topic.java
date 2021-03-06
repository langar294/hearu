package com.landao.hearu.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.landao.hearu.model.enums.TopicType;
import com.landao.hearu.model.topic.TopicInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 话题
 * </p>
 *
 * @author 常珂洁
 * @since 2022-01-24
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Topic implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 修改时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 类别
     */
    private TopicType type;

    public static Topic convert(TopicInfo topicInfo,TopicType topicType,Long userId){
        Topic topic = new Topic();
        topic.setId(topicInfo.getId());
        topic.setTitle(topicInfo.getTitle());
        topic.setContent(topicInfo.getContent());
        topic.setUserId(userId);
        topic.setType(topicType);
        return topic;

    }


}
