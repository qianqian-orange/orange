import Rectangle from '../constructors/rectangle'

export const rectangle = {
  rectangle: new Rectangle({
    id: 'rectangle',
    draggable: true,
    component: {
      style: {
        width: '148px',
        height: '32px',
        borderRadius: '0',
      },
    },
  }),
}
