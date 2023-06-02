import styles from './Badge.module.scss';

interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => (
  <span className={styles.badge}>{text}</span>
);

export default Badge;

// code sets up the Badge component, which renders a <span> element with a specific CSS class and displays the text property passed as a prop
//this badge refers to the visual element typically used to display short, conscise information /
// represented as a small rectangular shape with text inside 

// code sets up the Badge component, 
// which renders a <span> element with a specific CSS
//  class and displays the text property passed as a prop