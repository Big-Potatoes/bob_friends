import React from 'react'
import { TagListWrapper } from '../styles/s-components/tag'
import { Tag } from '../styles/s-global/common'

const TagList = ({ tags, deleteTagContent }) => {
  return (
    <TagListWrapper className="tagList__wrapper">
      {tags.map((el, idx) => {
        return (
          <Tag
            key={idx}
            onClick={(e) => deleteTagContent(e, el)}
          >{`${el}X`}</Tag>
        )
      })}
    </TagListWrapper>
  )
}

export default TagList
