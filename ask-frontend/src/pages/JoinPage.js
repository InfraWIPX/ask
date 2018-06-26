import React from 'react'

const JoinPage = props => (
  <div className="container" style={{ paddingTop: 150 }}>
    <div className="row">
      <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
        <h2
          className="text-center"
          style={{
            color: 'black',
          }}
        >
          {`Welcome to`}
        </h2>
        <h4 className="text-center text-black">"ROOM NAME"</h4>
        <div
          className="card"
          style={{
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <div className="container pt-4">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control text-center"
                  placeholder="Enter asker name"
                  style={{
                    backgroundColor: 'rgba(211,211,211,0.8)',
                    borderRadius: 10,
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary  .btn-primary:hover"
              >
                JOIN ROOM
              </button>

              <button
                type="submit"
                className="btn btn-primary  .btn-primary:hover ml-5"
              >
                Facebook
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default JoinPage
