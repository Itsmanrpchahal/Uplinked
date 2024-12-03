import React, { useState } from 'react';
import { View } from 'react-native';
import { withTheme } from 'styled-components';
import { useActions } from '@root/hooks/useActions';
// @ts-ignore
import styled from 'styled-components/native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import AwesomeAlert from 'react-native-awesome-alerts';

const MessageFilesSheet = () => {

    const { messageFilesData, messageLoading } = useTypedSelector((state) => state.messageFilesData);
    const {  getMessageFiles } = useActions();
    const [showalert, setShowAlert] = useState(false)
    const [cancelable, setCancelable] = useState(true)
    const [btnText, setbtnText] = useState('Confirm')
    const [id, setId] = useState();
    return (

        <View>
            {
                messageFilesData && messageFilesData.map((item: any) => (
                    <CustomMainWrapper>
                        <ItemView>
                            <FilesBackground>
                                <SelectedImage
                                    source={{
                                        uri:
                                            'data:image/png;base64,  ' +
                                            item.image,
                                    }} />

                                {/* <FilesText>Description</FilesText>
                                <FilesTextDescription>
                                   {JSON.stringify(item)}
                                </FilesTextDescription> */}
                            </FilesBackground>
                        </ItemView>
                    </CustomMainWrapper>
                )
                )
            }

            <AwesomeAlert
                show={showalert}
                showProgress={false}
                title="Alert"
                message="Are you sure to delete this?"
                closeOnTouchOutside={cancelable}
                closeOnHardwareBackPress={cancelable}
                showCancelButton={cancelable}
                showConfirmButton={true}
                cancelText="Cancel"
                confirmText={btnText}
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false)
                }}
                onConfirmPressed={async () => {
                    setbtnText('Deleting...')
                    setCancelable(true)
                   
                    getMessageFiles({
                        'id': id
                    })
                    setCancelable(true)
                    setShowAlert(false)
                }}
            />
        </View>
    );
};

// @ts-ignore
export default withTheme(MessageFilesSheet);

const DeleteLoadingWrapper = styled.View`
    position: absolute;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const DeleteLoadingText = styled.Text``;

const FilesTextDescription = styled.Text`
    margin: 5px 0 0px 8px;
    font-size: ${({ theme }: any) => theme.fontSize.cardText};
    color: ${({ theme }: any) => theme.colors.text};
`;

const FilesText = styled.Text`
    margin: 5px 0 0px 8px;
    font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
    color: ${({ theme }: any) => theme.colors.text};
`;

const SelectedImage = styled.Image`
  height: 145px;
  margin-bottom:10px;
  border-radius: 8px;
  background: #000000;
`;

const FilesBackground = styled.View`
    margin: 16px;
    border-radius: 8px;
    background: ${({ theme }: any) => theme.colors.primary};
    padding: 24px 15px;
`;

const DeleteImage = styled.Image``;

const DeleteIcon = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
    top: 30px;
    right: 30px;
`;

const ItemView = styled.View``;

const CustomMainWrapper = styled.View`
    background-color: ${({ theme }: any) => theme.colors.secondary};
    position: relative;
`;
