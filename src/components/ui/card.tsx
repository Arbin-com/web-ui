import Alert from "./alert";
import Button from "./button";

export default function Card() {
  return (
    <div className="flex gap-2">
      <Button>Alert</Button>
      <Alert />
    </div>
  );
}
