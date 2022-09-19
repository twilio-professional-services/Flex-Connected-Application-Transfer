import { Icon } from "@twilio/flex-ui";
import { Input } from "@twilio-paste/core";

const Search = (props) => {
  return (
    <Input
      insertBefore={<Icon icon="Search" />}
      placeholder={props.placeholder}
      onChange={(event) => props.onChange(event.target.value)}
    />
  );
};

export default Search;
