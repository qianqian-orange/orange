import Select from '../constructors/select'
import Icon from '../constructors/icon'

export const select = {
  select: new Select({
    id: 'select',
    props: {
      attr: {
        group: 'date',
        options: [{
          label: '星期一',
          value: 'Monday',
        }, {
          label: '星期二',
          value: 'Tuesday',
        }, {
          label: '星期三',
          value: 'Wednesday',
        }, {
          label: '星期四',
          value: 'Thursday',
        }, {
          label: '星期五',
          value: 'Friday',
        }, {
          label: '星期六',
          value: 'Saturday',
        }, {
          label: '星期日',
          value: 'Sunday',
        }],
      },
    },
    component: {
      style: {
        width: '120px',
        height: '32px',
        borderRadius: '4px',
      },
      props: {
        stroke: {
          style: {
            borderColor: '#d9d9d9',
          },
        },
      },
    },
    children: [
      new Icon({
        id: 'icon',
        props: {
          editable: {
            stretch: false,
            move: false,
            event: false,
          },
        },
        container: {
          style: {
            position: 'absolute',
            top: '8px',
            right: '10px',
            zIndex: 1,
          },
        },
        component: {
          style: {
            width: '14px',
            height: '14px',
            color: '#d9d9d9',
          },
          props: {
            type: 'down',
            theme: 'outlined',
          },
        },
      }),
    ],
  }),
}
