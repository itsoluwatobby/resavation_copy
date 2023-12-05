import React from 'react'

export default function FeatureCard({bgColor, shadowColor, title, content}) {
  return (
    <div className={`bg-[${bgColor}] m-4 p-6 rounded shadow-lg shadow-[${shadowColor}]`}>
            <h3 className="font-regular text-xl">{title}</h3>
            <br />
            <p>
              {content}
            </p>
    </div>
  )
}
