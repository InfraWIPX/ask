import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import instance from '../../libs/axios'
import swal from 'sweetalert2'

const PrimaryColor = '#1BB7BF'

const OrgCreate = props => (
  <div>
    <div className="container">
      <div
        className="card"
        style={{
          marginTop: 20,
          backgroundColor: 'rgba(255,255,255,0.8)'
        }}
      >
        <div className="card-block" >
          <form onSubmit={(e) => props.onSending(e)}>
            <div className="row">
              <div className="col-12">
                <h1>Create Room</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter room name"
                    onChange={e => props.onChangeRoomName(e)}
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="form group">
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button
                      type="button"
                      className={'btn btn-secondary ' + (props.isOpen ? 'active' : 'point')}
                      onClick={() => props.setRoomOpen(true)}
                    >
                      {'Open'}
                    </button>
                    <button
                      type="button"
                      className={'btn btn-secondary ' + (!props.isOpen ? 'active' : 'point')}
                      onClick={() => props.setRoomOpen(false)}
                    >
                      {'Close'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block point"
              >
              Sent
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)

const CreateConpose = compose(
  withState('roomName', 'setRoomName', ''),
  withState('isOpen', 'setRoomOpen', false),
  // lifecycle({
  //   async componentsDidMount() {
  //   }
  // }),
  withHandlers({
    onSending: props => async (e) => {
      e.preventDefault()
      swal({
        title: 'Are you sure to delete',
        text: `Are you sure to delete this question that '${q.question}'`,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Confirm',
        confirmButtonColor: PrimaryColor,
        customClass: 'Button',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise((resolve, reject) => {
            instance.post('/rooms/create', {
              title: props.roomName,
              openSending: props.openSending
            }).then(resp => {
              resolve(resp.data)
            })
          })
        }
      }).then((data) => {
        if (data.status) {
          props.setSelected([])
          swal({
            title: 'Success',
            text: `Room was created`,
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: PrimaryColor
          })
        } else {
          swal({
            title: 'Failed',
            text: `Sorry, cannot create room now.`,
            type: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: PrimaryColor
          })
        }
      })
    },
    onChangeRoomName: props => (e) => {
      let title = e.target.value
      props.setRoomName(title)
    },
    onToggleStatus: props => (e) => {
      let openSending = e.target.value
      props.isOpen(openSending)
    }
  })
)(OrgCreate)

export default CreateConpose
