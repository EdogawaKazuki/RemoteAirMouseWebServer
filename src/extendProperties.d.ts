import { ComponentCustomOptions } from "vue";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: any;
    }
}

export default ComponentCustomProperties;