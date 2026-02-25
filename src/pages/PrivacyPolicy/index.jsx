import { Container, Link, List, ListItem, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: '2em',
        padding: '2em',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Reformation Voice. This app is created to serve the community
        and is not intended for commercial purposes. Your privacy is important
        to us, and this policy explains how we handle and use your data.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Permissions We Use
      </Typography>
      <List>
        <ListItem>
          <Typography variant="body1">
            <strong>Internet:</strong> This permission allows the app to read
            data from our web service, such as sermons and religious content.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Access Notification Policy:</strong> This permission is used
            to show audio download statuses in the notification panel.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Bind Notification Listener Service:</strong> This permission
            supports the above functionality by ensuring seamless updates in the
            notification panel.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Write External Storage:</strong> This permission allows the
            app to save downloaded sermons to your device for offline access.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Read External Storage:</strong> This permission enables the
            app to read previously saved sermons from your device.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Bluetooth:</strong> This permission is used to connect to
            Bluetooth devices, such as speakers or headphones, for a better
            listening experience.
          </Typography>
        </ListItem>
      </List>

      <Typography variant="h5" gutterBottom>
        Data Collection and Usage
      </Typography>
      <Typography variant="body1" paragraph>
        We do not collect or store personal data. The permissions listed above
        are strictly used to enhance the app&apos;s functionality and provide a
        better user experience. All data fetched from our web service is used
        solely within the app and is not shared with third parties.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Non-Commercial Use
      </Typography>
      <Typography variant="body1" paragraph>
        This app is provided free of charge and is intended for religious and
        community purposes only. There are no monetization strategies or
        advertisements within the app.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about this Privacy Policy or the app, please
        feel free to contact us at{' '}
        <Link href="mailto:info@reformationvoice.org">
          info@reformationvoice.org
        </Link>
        .
      </Typography>

      <Typography variant="h5" gutterBottom>
        Changes to This Policy
      </Typography>
      <Typography variant="body1" paragraph>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page, and we encourage you to review it periodically.
      </Typography>

      <Typography variant="body2" color="textSecondary" align="center">
        Last updated: January 15, 2025
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
