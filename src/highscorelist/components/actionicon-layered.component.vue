<script>
export default {
  name: "action-icon",

  functional: true,

  props: {
    wrapper: {
      type: Object
    },
    actions: {
      type: Object
    },
    transform: {
      type: String,
      default: "shrink-8"
    }
  },

  render: function(h, { props, listeners }) {
    return (
      <font-awesome-layers
        onClick={() => {
          listeners.click();
        }}
        title={props.wrapper.title}
        class={`fa-lg qp-action-icon qp-action-icon-layer ${
          props.wrapper.class ? props.wrapper.class : ""
        }`}
      >
        <font-awesome-icon icon={["far", "circle"]} />
        <font-awesome-icon
          class={props.actions.class}
          icon={props.actions.icon}
          transform={props.transform}
        />
      </font-awesome-layers>
    );
  }
};
</script>
