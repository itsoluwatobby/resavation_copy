import "./skeleton.css"

/**
 * @desc SkeletonLoading - A loading component  
 * @param {*} classes - classes to use includes (
 * width-100, width-50, width-10, text, title, profile-circle, 
 * text-plain, title-plain width-65, profile-circle-min)
 * @use pass the any of the classes in as props
 */
export default function SkeletonLoading({ classes }) {
  const classNames = `skeleton ${classes} animate-pulse`;

  return (
    <div className={classNames} />
  )
}
