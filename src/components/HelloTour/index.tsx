import React, {useState} from 'react';
import {
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Text,
  Header,
  ProgressBar,
  Checkbox
} from '@adobe/react-spectrum';

import {useAppSettings} from 'hooks/store/app';
import i18n from 'services/i18n';

// this is only mock, content should be fetched dynamically, for example from CMS
const contents = [
  (
    <>
      <Text>This quick tour will guide you through the app.</Text><br />
      <Text>You can quit it or disable it for your further visits.</Text>
    </>
  ),
  (
    <>
      <Text>This is simple app for fetching some articles. It supports different article categories.</Text><br /><br />
      <Text>Articles can be filtered out and sorted. Sorting and filtering can be applied at the same time.</Text><br /><br/>
      <Text>New set of articles will be fetched no shorter than in 5 minutes by default. Before this time, you can play around with filters without a single request to the API.</Text><br /><br/>
    </>
  ),
  (
    <>
      <Text>The app was build to test out new React UI kit and for Schibsted. 👨‍💻</Text><br /><br />
      <Text>It was tested for Firefox, Chrome and Safari.</Text><br /><br />
      <Text>It is written using Redux and Typescript to provide type safety, predictability and testability.</Text><br /><br />
      <Text>Additional features: sorting by title, saving app settings in local storage, i18n, theme switcher, hello tour (the very one you are reading).</Text><br /><br />
    </>
  ),
  (
    <>
      <Text>Thank you for reading this description and testing the app.</Text><br /><br />
    </>
  )
];

const HelloTour = () => {
  const {isHeroTourRead, set: setAppSettings} = useAppSettings();

  const [isDialogOpen, setIsDialogOpen] = useState(!isHeroTourRead);
  const [contentKey, setContentKey] = useState<number>(0);

  const isLastContent = contentKey === 3;

  return (
    <DialogTrigger isOpen={isDialogOpen}>
      <ActionButton isHidden={true} />
      <Dialog>
        <Heading>{i18n.t('helloTour.title')}</Heading>
        <Header>
          <ProgressBar value={contentKey * 34} />
        </Header>
        <Divider />
        <Content>
          {contents[contentKey]}
          {isLastContent ? (
            <Checkbox
              onChange={(isSelected) => {
                setAppSettings({
                  isHeroTourRead: isSelected
                })
              }}
            >
              {i18n.t('helloTour.dismissCheckboxLabel')}
            </Checkbox>
          ) : null}
        </Content>
        <ButtonGroup>
          <Button
            onPress={() => {
              setIsDialogOpen(false);
            }}
            variant={'secondary'}
          >
            {i18n.t('helloTour.cancelButton')}
          </Button>
          <Button
            onPress={() => {
              if ([0, 1, 2].includes(contentKey) ) {
                setContentKey(contentKey + 1);
              } else {
                setIsDialogOpen(false);
              }
            }}
            variant={'cta'}
          >
            {isLastContent
              ? i18n.t('helloTour.finishButton')
              : i18n.t('helloTour.nextButton')
            }
          </Button>
        </ButtonGroup>
      </Dialog>
    </DialogTrigger>
  );
};

export default HelloTour;
