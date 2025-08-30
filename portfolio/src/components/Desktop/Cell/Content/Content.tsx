interface DesktopCellContentProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

function Content(props: DesktopCellContentProps) {
  return <>{props.children}</>;
}

export default Content;
