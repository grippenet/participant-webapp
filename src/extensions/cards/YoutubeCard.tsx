import React from 'react';
import { GenericPageItemProps } from '@influenzanet/case-web-app-core/build/types/extensionComponents';

interface YoutubeCardProps extends GenericPageItemProps {
    embedId: string;
    minHeight?: number;
    fallbackText?: string;
}
 
const YoutubeCard: React.FC<YoutubeCardProps> = (props : YoutubeCardProps) => {
    
    const className = props.className || 'embed-responsive embed-responsive-16by9 h-100';
    const minHeight = props.minHeight ||  "360px";

    return (
      <div className={className}>
        <iframe
          style={{"minHeight": minHeight}}
          className='embed-responsive-item w-100 h-100'
          src={`https://www.youtube-nocookie.com/embed/${props.embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
    </div>
    );
  };
  
  export default YoutubeCard;
  