import { FC } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { LoadingSpinner, Searchbar } from '../../common/components';
import { useSearchProductByNameModal } from '../hooks';

interface Props {
  isModalOpen:boolean,
  closeModal:()=>void;
}

export const SearchProductByNameModal: FC<Props> = ({isModalOpen, closeModal}) => {

    const { 
      onInputChange,
      onSearch,
      searchIsLoading,
      searchbarInputValue,
      products,
      onOpenModal,
    } = useSearchProductByNameModal();

    return (
        <Modal
            show={ isModalOpen } 
            onShow={()=>{
              onOpenModal();
            }}
            onHide={()=>{
              closeModal();
            }} 
            style={{
                display:'flex',
            }}
            onBackdropClick={()=>{
              closeModal();
            }}
        >
          {
            (searchIsLoading) ? (
              <div className="row d-flex justify-content-center mt-5 mb-5">
                <div className="col d-flex flex-column align-items-center w-100">
                  <LoadingSpinner/>
                </div>
              </div>
            ) :
            (
              <>

                <Modal.Header closeButton>
                    <Modal.Title> Buscar producto por nombre: </Modal.Title>
                </Modal.Header>
                
                <div className="row d-flex justify-content-center mb-5">
                    <div className="col d-flex flex-column align-items-center w-100">

                      <Searchbar 
                        onInputChange={onInputChange} 
                        onSearch={onSearch} 
                        productsDropdown={products} 
                        searchIsLoading={searchIsLoading}  
                        searchbarInputValue={searchbarInputValue}
                      />

                      <Modal.Footer style={{justifyContent:'center'}}>
                          <Button variant="primary" onClick={closeModal}>
                              Cerrar
                          </Button>
                      </Modal.Footer>

                    </div>
                </div>

              </>
            )
          }
        

        </Modal>
    )
}
