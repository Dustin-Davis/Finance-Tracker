export default function Redirect(props) {
  const url = new URL(window.location);
  if (props.to === 'home') {
    url.hash = '#home';
  } else {
    url.hash = props.to;
  }
  window.location.replace(url);
  return null;
}
