import { FazBsAlert } from ".";
import { FazElementAttributes  } from "faz/types/faz-elements";

interface FazBsElementItemAttributes extends FazElementAttributes<T> {
    public kind: Accessor<string|undefined>;
    public target: Accessor<string|undefined>;
    public theme: Accessor<string|undefined>;
}

interface FazNavElement extends FazElementItem {
}

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            'faz-bs-alert': FazElementAttributes<FazBsAlert>;
        }
    }
}
