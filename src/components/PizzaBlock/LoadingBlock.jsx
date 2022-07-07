import React from 'react'
import ContentLoader from "react-content-loader"

const LoadingBlock = () => {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f7f7f7"
            foregroundColor="#ecebeb"

        >
            <rect x="136" y="168" rx="0" ry="0" width="0" height="9" />
            <rect x="2" y="266" rx="3" ry="3" width="280" height="25" />
            <circle cx="119" cy="128" r="116" />
            <circle cx="185" cy="178" r="17" />
            <rect x="-5" y="308" rx="6" ry="6" width="280" height="84" />
            <rect x="-1" y="415" rx="3" ry="3" width="91" height="31" />
            <rect x="139" y="415" rx="19" ry="19" width="137" height="31" />
        </ContentLoader>
    )
}

export default LoadingBlock