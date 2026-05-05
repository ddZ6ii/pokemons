export function Logo(props: React.ComponentProps<'img'>) {
  return (
    <img
      src="/pokeball.png"
      alt=""
      width={767}
      height={767}
      className="size-9"
      {...props}
    />
  )
}
