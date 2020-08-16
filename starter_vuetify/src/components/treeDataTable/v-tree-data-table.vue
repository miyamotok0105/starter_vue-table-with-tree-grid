/**
* This component handles rendering a tree view in a data grid
*/

<template>
  <div class="v-tree-data-table">
    <v-data-table ref="dataTable" v-model="selected" :show-select="selectAll" :items-per-page-text="rowsPerPageText" :items-per-page-options="rowsPerPageItems" :headers="computedHeaders" :items="flattenedNodes" :server-items-length="totalItems" :loading="loading">
      <template slot="no-data">
        <slot name="no-data">
          <tr>
            <td :colspan="headers.length + (selectAll ? 1 : 0)" class="text-xs-center">
              No matching records found
            </td>
          </tr>
        </slot>
      </template>

      <template slot="headers" slot-scope="props">
        <slot name="headers" :props="props">
          <tr>
            <th v-if="selectAll" width="50px">
              <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details @click.native="toggleSelectAll"></v-checkbox>
            </th>
            <template v-for="header in props.headers">
              <th v-if="header.sortable" :key="header.text" :class="['column sortable', 'desc', 'active' , `text-xs-${header.align || 'left'}`]" @click="changeSort(header.value)">
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
              <th v-else :key="header.text" :class="`text-xs-${header.align || 'left'}`">
                {{ header.text }}
              </th>
            </template>
          </tr>
        </slot>
      </template>

      <template slot="items" slot-scope="props">
        <tr v-if="props.index == 0" class="drop-row inactive" :style="nodeHidden(props.item)">
          <td :colspan="computedHeaders.length + (selectAll ? 1 : 0)"></td>
        </tr>

        <tr v-if="props.item.leaf" class="leaf" :active="props.selected" @dblclick="(e)=>{$emit('dblclick', e, props.item)}" @contextmenu.prevent="(e)=>{$emit('contextmenu', e, props.item)}" :key="props.item.id" :id="props.item.id" :style="nodeHidden(props.item)">
          <td v-if="selectAll">
            <v-checkbox @click="props.selected = !props.selected" :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td class="px-1" style="width: 0.1%">
            drag_handle
          </td>
          <td v-if="props.item.leaf" class="expandable-node" style="width: 0.1%" :style="nodeStyle(props.item)">
            <v-icon>keyboard_arrow_{{($vuetify.rtl?"left":"right")}}</v-icon>
          </td>
          <td v-else class="expandable-node" @click="toggleNode(props.item)" style="width: 0.1%" :style="nodeStyle(props.item)">
            <v-icon>{{expandableIcon(props.item)}}</v-icon>
          </td>
          <slot name="row" v-bind="props"></slot>
        </tr>

        <tr v-if="!props.item.leaf" class="folder" :active="props.selected" @dblclick="(e)=>{$emit('dblclick', e, props.item)}" @contextmenu.prevent="(e)=>{$emit('contextmenu', e, props.item)}" :key="props.item.id" :id="props.item.id" :style="nodeHidden(props.item)">
          <td v-if="selectAll">
            <v-checkbox @click="props.selected = !props.selected" :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td class="px-1" style="width: 0.1%">
            drag_handle
          </td>
          <td v-if="props.item.leaf" class="expandable-node" style="width: 0.1%" :style="nodeStyle(props.item)">
            <v-icon>keyboard_arrow_{{($vuetify.rtl?"left":"right")}}</v-icon>
          </td>
          <td v-else class="expandable-node" @click="toggleNode(props.item)" style="width: 0.1%" :style="nodeStyle(props.item)">
            <v-icon>{{expandableIcon(props.item)}}</v-icon>
          </td>
          <slot name="row" v-bind="props"></slot>
        </tr>

        <tr class="drop-row inactive" :style="nodeHidden(props.item)">
          <td :colspan="computedHeaders.length + (selectAll ? 1 : 0)"></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import nodeHelper from "./nodeHelper.js";
export default {
  props: {
    headers: {
      type: Array,
      default: [],
      required: true
    },
    items: {
      type: Array,
      default: [],
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    rowsPerPageItems: {
      type: Array,
      default: () => {
        return [
          5,
          10,
          25,
          { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
        ];
      }
    },
    rowsPerPageText: {
      type: String,
      default: `$vuetify.dataTable.rowsPerPageText`
    },
    selectAll: {
      type: [Boolean, String],
      default: undefined
    },
    value: {
      type: Array,
      default: undefined
    },
    validDrop: {
      type: Function,
      default: undefined
    }
  },
  mounted: function() {
    
  },
  data: function() {
    return {
      flattenedNodes: [],
      overFolder: null,
      newParentNode: null,
      selected: []
    };
  },
  watch: {
    items() {
      this.flattenNodes();
    },
    value() {
      this.selected = this.value;
    },
    selected() {
      this.$emit("input", this.selected);
    }
  },
  computed: {
    computedHeaders() {
      let headers = this.headers;
      headers.unshift({
        text: "",
        value: "expanded",
        sortable: false
      });
      headers.unshift({
        text: " ",
        value: "sortable",
        sortable: false
      });
      return headers;
    }
  },
  methods: {
    /**
     * Fired when select all is toggled
     */
    toggleSelectAll() {
      if (this.selected.length > 0) {
        this.selected = [];
      } else {
        this.selected = this.items;
      }
    },
    /**
     * Find the node in items
     * @param {String | Number} nodeId The Node
     * @return {Object} the Node
     */
    findNode(nodeId) {
      nodeHelper.findNode(nodeId, this.items);
    },
    /**
     * Get the icon for the node
     * @param {Object} node The Node
     */
    expandableIcon(node) {
      if (node.expanded) {
        return "folder_open";
      } else {
        return "folder";
      }
    },
    /**
     * Get the style padding for the node
     * @param {Object} node The Node
     */
    nodeStyle(node) {
      if (this.$vuetify.rtl){
        return {
          paddingRight: 8 + 12 * node.depth + "px"
        };
      } else {
        return {
          paddingLeft: 8 + 12 * node.depth + "px"
        };
      }
    },
    /**
     * Flatten nested nodes
     */
    flattenNodes(nodes) {
      nodes = nodes || this.items;
      this.flattenedNodes = nodeHelper.flattenNodes(nodes);
    },
    /**
     * UnFlatten flattend nodes
     */
    unFlattenNodes() {
      return nodeHelper.unFlattenNodes(this.flattenedNodes);
    },
    /**
     * Determine if a node should be hidden
     * @param {Object} node The Node
     */
    nodeHidden(node) {
      if (!node.parentNode) {
        return null;
      } else if (node.parentNode.expanded) {
        return null;
      } else {
        return "display:none;";
      }
    },
    /**
     * Toggle node from expanded
     * @param {Object} node The Node
     */
    toggleNode(node) {
      this.$set(node, "expanded", !node.expanded);
      if (!node.expanded) this.collapseChildren(node);
      this.$emit("node-toggle", node);
    },
    /**
     * Collapse all nodes children
     * @param {Object} node The Node
     */
    collapseChildren(node) {
      let vm = this;
      this.$set(node, "expanded", false);
      if (node.children) {
        node.children.forEach(child => {
          vm.collapseChildren(child);
        });
      }
    },
    /*
    * Helpers
    */
    /**
     * Clear any active classes
     */
    clearActive() {
      $(this.$el)
        .find(".active")
        .removeClass("active");
    }
  }
};
</script>

<style>
.v-tree-data-table .folder {
  cursor: pointer;
}
.v-tree-data-table .drag * {
  pointer-events: none;
}
.v-tree-data-table .inactive {
  border: none !important;
  height: 5px;
  background-color: transparent !important;
}
.v-tree-data-table .inactive td {
  height: 5px !important;
}
.v-tree-data-table .active {
  background-color: green !important;
}
.v-tree-data-table .active td {
  height: 15px !important;
}
.v-tree-data-table .sort-handle {
  cursor: move;
}
</style>