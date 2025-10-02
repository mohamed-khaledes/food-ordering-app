function MainHead({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <div className='mb-3'>
      <span className='uppercase text-accent font-semibold leading-4'>{subTitle}</span>
      <h2 className='text-primary font-bold text-4xl italic'>{title}</h2>
    </div>
  )
}

export default MainHead
